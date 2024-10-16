import { Body, Controller, Get, Route, Tags, Path, Post, Patch, Delete } from "tsoa";
import { GameDTO } from "../dto/game.dto";
import { GameService, gameService } from "../services/game.service";
import { notFound } from "../error/NotFoundError";
import { Review } from "../models/review.model";
import { ReviewDTO } from "../dto/review.dto";
import { reviewService } from "../services/review.service";

@Route("games")
@Tags("Games")
export class GameController extends Controller {
  @Get("/")
  public async getAllGames(): Promise<GameDTO[]> {
    return gameService.getAllGames();
  }

  @Get("{id}")
  public async getGameById(@Path() id: number): Promise<GameDTO | null>{
    return gameService.getGameById(id);
  } 

  @Post("/")
  public async createGame(
    @Body() requestBody: GameDTO
  ): Promise<GameDTO> {
    const { title, console} = requestBody;
    return gameService.createGame(title, console);
  }

  @Patch("{id}")
  public async updateGame(
    @Path() id: number,
    @Body() requestBody: GameDTO
  ): Promise<GameDTO | null> {
    const { title, console } = requestBody;

    return gameService.updateGame(id, title, console);
  }

  @Delete("{id}")
  public async deleteConsole(@Path() id: number): Promise<void> {
    await gameService.deleteGame(id);
  }

  @Get("{id}/reviews")
  public async getReviewsByGameId(@Path() id: number) : Promise<ReviewDTO[] | null > {
    return reviewService.getReviewsByGameId(id);
  }
}
