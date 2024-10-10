import { ReviewDTO } from "../dto/review.dto";
import { Review } from "../models/review.model";
import { Game } from "../models/game.model"; 


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
        return Review.findByPk(id);
      } 
} 

export const reviewService = new ReviewService();