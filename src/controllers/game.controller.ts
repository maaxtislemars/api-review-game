import { Body, Controller, Get, Route, Tags, Path, Post, Patch } from "tsoa";
import { GameDTO } from "../dto/game.dto";
import { GameService, gameService } from "../services/game.service";
import { notFound } from "../error/NotFoundError";

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
}
