import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PostDocument } from './post.schema';
import { UserDocument } from './user.schema';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { TrackableType, TrackerDocument } from './tracker.schema';

interface ResposeType {
    data: PostDocument[],
    paging: {
        cursor: Object,
        next: string
    }
}

@Injectable()
export class FuzgramService {
  constructor(
    private readonly httpService: HttpService,
    @InjectModel('post') private postModel: Model<PostDocument>,
    @InjectModel('user') private userModel: Model<UserDocument>,
    @InjectModel('tracker') private trackerModel: Model<TrackerDocument>,
  ) {}

  // async create(createCatDto: CreateCatDto): Promise<Post> {
  //   const createdCat = new this.catModel(createCatDto);
  //   return createdCat.save();
  // }

  // async findAll(): Promise<Cat[]> {
  //   return this.catModel.find().exec();
  // }



  async storePosts(): Promise<void> {
    // const resp = await this.api.sendMessage(task);
    // console.log(resp.text.split("\n"));
    // return resp.text.split("\n");

    const uuid = '1234';
    const token = 'IGQVJWczVsOFJZAczQtS0FHNzZAoeUQ3X1NZAczE5THlpNXlNNi1LeFZAmZAHlWbjhVMDhjajB5MTFkVVZAzSWVPSmtuS1NOQkpFekpXbkJncmt2c2VORWhyVHJScWpxZAl9PbTdXakZADdF95SE40QS1hX3RGZAgZDZD';
    
    let url =  `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url&access_token=${token}`

    let me_url = `https://graph.instagram.com/me?fields=id,username&access_token=${token}`

    const {data} = await firstValueFrom(
      this.httpService.get(me_url).pipe(
        catchError((error: AxiosError) => {
            //   this.logger.error(error.response.data);
            console.log(error.cause)
            throw 'An error happened!';
        }),
      ),
    );

    const socialUsername = data.username;

    while (url !== undefined) {

        const {data} = await firstValueFrom(
            this.httpService.get(url).pipe(
            catchError((error: AxiosError) => {
                //   this.logger.error(error.response.data);
                console.log(error.cause)
                throw 'An error happened!';
            }),
            ),
        );

        data.data.forEach(i => {
            i.uid = "123",
            i.socialUsername = socialUsername
            i.username = "pdrojack"
        });

        this.postModel.insertMany(data.data);

        url = data.paging.next

    }

  }

  async getPosts(username: string, socialUsername: string): Promise<PostDocument[]> {
    // Check if integration by this username and social exists or not 
    const data = await this.postModel.find({username, socialUsername}).exec();
    return data
  }

  async search(username: string, socialUsername: string, keyword: string): Promise<PostDocument[]> {
    const res = await this.postModel.find({username, socialUsername, $text: { $search: keyword}}).exec();
    console.log(res)
    return res
  }

  async socialAnalytics(username: string, social: string): Promise<void> {
      // Find the social
      const item = await this.userModel.findOne({username: username}).exec();

      const res = await this.trackerModel
                       .findOne({trackable_type: TrackableType.Social, tracker_id: `item.id:${social}`})
                       .exec();
     
      // increment the views
  }
}
