import { ConsoleDTO } from "../dto/console.dto";
import { GameDTO } from "../dto/game.dto";
import { notFound } from "../error/NotFoundError";
import { Console } from "../models/console.model";
import { Game } from "../models/game.model";

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

  public async getGameById(id: number): Promise<GameDTO | null>{
    return Game.findByPk(id);
  } 

  public async createGame(
    title: string,
    console: ConsoleDTO
  ): Promise<Game> {
    
    const consoleId = console.id;

    const existingConsol = await Console.findByPk(consoleId);
    if(!existingConsol){
      notFound("console");
    } 
    return Game.create({ title:title, console_id:consoleId });
  }

  public async updateGame(
    id: number,
    title: string,
    console: ConsoleDTO
  ): Promise<GameDTO | null> {
    const game = await Game.findByPk(id);
    if(!game) return notFound("game");
    const existingConsole = await Console.findByPk(console.id);
    if(!console) return notFound("console");

    game.title = title;
    game.console_id = console.id;
    await game.save();
    return game;
  }

}

export const gameService = new GameService();