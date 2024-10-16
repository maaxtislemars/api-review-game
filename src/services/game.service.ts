import { ConsoleDTO } from "../dto/console.dto";
import { GameDTO } from "../dto/game.dto";
import { notFound } from "../error/NotFoundError";
import { Console } from "../models/console.model";
import { Game } from "../models/game.model";
import { Review } from "../models/review.model";
import { foreignKeyError } from "../error/ForeignKeyError";
import { consoleService } from "./console.service";


export class GameService {
  public async getAllGames(): Promise<GameDTO[]> {
    return Game.findAll({
      include: [
        {
          model: Console,
          as: "console",
        },
      ],
    });
  }

  public async getGameById(id: number): Promise<GameDTO>{
    const game = await Game.findByPk(id);
    if(!game){
      notFound("game");
    } 
    return game;
  } 

  public async createGame(
    title: string,
    console: ConsoleDTO
  ): Promise<GameDTO> {
    
    const consoleId = console.id;

    await consoleService.getConsoleById(consoleId); // check if the console exists
    return Game.create({ title:title, console_id:console.id });
  }

  public async updateGame(
    id: number,
    title: string,
    console: ConsoleDTO
  ): Promise<GameDTO | null> {
    const game = await Game.findByPk(id);
    if(!game) return notFound("game");
    const existingConsole = await Console.findByPk(console.id);
    if(!existingConsole) return notFound("console");

    game.title = title;
    game.console_id = existingConsole.id;
    await game.save();
    return game;
  }

  public async deleteGame(id: number): Promise<void> {

    const reviewCount = await Review.count({
      where:{
        game_id: id
      } 
    });

    if(reviewCount>0){
      foreignKeyError("review");
    } 

    const game = await Game.findByPk(id);

    if(!game){
      notFound("game");
    }
    game.destroy();
  }

  public async getGamesByConsoleId(id: number): Promise<GameDTO[] | null > {

    const console = await consoleService.getConsoleById(id);

    const games = Game.findAll({
      where: {
        console_id: id
      } 
    });

    return games;
  } 

}

export const gameService = new GameService();