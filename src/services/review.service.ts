import { ReviewDTO } from "../dto/review.dto";
import { Review } from "../models/review.model";
import { Game } from "../models/game.model"; 
import { notFound } from "../error/NotFoundError";
import { GameDTO } from "../dto/game.dto";

export class ReviewService {
    public async getAllReview(): Promise<ReviewDTO[]> {
        return Review.findAll({
          include: [
            {
              model: Game,
              as: "game",
            },
          ],
        });
    }

    public async getReviewById(id: number): Promise<ReviewDTO | null>{
      const review = await Review.findByPk(id);
      if(!review){
        notFound("review");
      } 
      return review;
    } 

    public async createReview (
      rating: number,
      reviewText: string,
      game: GameDTO
    ): Promise<ReviewDTO> {
      const gameId = game.id;
      const existingGame = await Game.findByPk(gameId);

      if(!existingGame){
        notFound("game");
      }
      return Review.create({ game_id:existingGame.id, rating:rating, review_text:reviewText });
    } 

    public async updateReview(
      id: number,
      rating: number,
      reviewText: string,
      game: GameDTO
    ): Promise<ReviewDTO> {
      const review = await Review.findByPk(id);
      if(!review) return notFound("review");
      const existingGame = await Game.findByPk(game.id);
      if(!existingGame) return notFound("console");
  
      review.rating = rating;
      review.review_text = reviewText;
      review.game_id = existingGame.id;
      await review.save();
      return review;
    }
} 

export const reviewService = new ReviewService();