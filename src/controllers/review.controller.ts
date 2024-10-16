import { Controller, Route, Tags, Get, Path, Post, Body, Patch, Delete } from "tsoa";
import { ReviewDTO } from "../dto/review.dto";
import { reviewService } from "../services/review.service";
import { notFound } from "../error/NotFoundError";
import { consoleService } from "../services/console.service";

@Route("reviews")
@Tags("Reviews")
export class ReviewController extends Controller {
   @Get("/")
   public async getAllReviews(): Promise<ReviewDTO[]> {
    return reviewService.getAllReview();
   }   

   @Get("{id}")
  public async getReviewById(@Path() id: number): Promise<ReviewDTO | null>{
    return reviewService.getReviewById(id);
  }

  @Post("/")
  public async createGame(
    @Body() requestBody: ReviewDTO
  ): Promise<ReviewDTO> {
    const { rating, review_text, game } = requestBody;
    return reviewService.createReview(rating, review_text, game);
  }

  @Patch("{id}")
  public async updateGame(
    @Path() id: number,
    @Body() requestBody: ReviewDTO
  ): Promise<ReviewDTO> {
    const { rating, review_text, game } = requestBody;

    return reviewService.updateReview(id, rating, review_text, game);
  }

  @Delete("{id}")
  public async deleteConsole(@Path() id: number): Promise<void> {
    await reviewService.deleteReview(id);
  }
}
