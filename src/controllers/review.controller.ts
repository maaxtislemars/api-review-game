import { Controller, Route, Tags, Get, Path } from "tsoa";
import { ReviewDTO } from "../dto/review.dto";
import { reviewService } from "../services/review.service";
import { notFound } from "../error/NotFoundError";

@Route("reviews")
@Tags("Reviews")
export class ReviewController extends Controller {
   @Get("/")
   public async getAllReviews(): Promise<ReviewDTO[]> {
    return reviewService.getAllReview();
   }   

   @Get("{id}")
  public async getReviewById(@Path() id: number): Promise<ReviewDTO | null>{
    const review = await reviewService.getReviewById(id);
    if(!review){
      notFound("review");
    } 
    return review;
  } 
}
