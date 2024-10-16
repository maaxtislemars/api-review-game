import { foreignKeyError } from "../error/ForeignKeyError";
import { notFound } from "../error/NotFoundError";
import { Console } from "../models/console.model";
import { Game } from "../models/game.model";
import { Review } from "../models/review.model";

export class ConsoleService {

  // Récupère toutes les consoles
  public async getAllConsoles(): Promise<Console[]> {
    return await Console.findAll();
  }

  // Récupère une console par ID
  public async getConsoleById(id: number): Promise<Console> {
    const console = await Console.findByPk(id);
    if(!console){
      notFound("console");
    } 
    return console;
  }

  // Crée une nouvelle console
  public async createConsole(
    name: string,
    manufacturer: string
  ): Promise<Console> {
    return Console.create({ name: name, manufacturer: manufacturer });
  }

  // Supprime une console par ID
  public async deleteConsole(id: number): Promise<void> {

    const games = await Game.findAll({
      where: {
        console_id: id
      } 
    });

    for(const game of games){
      
      const reviewCount = await Review.count({
        where:{
          game_id: game.id
        } 
      });

      if(reviewCount>0){
        foreignKeyError("review");
      } 

    } 

    const console = await Console.findByPk(id);

    if (!console) {
      notFound("console");
    }
    console.destroy();
  }

  // Met à jour une console
  public async updateConsole(
    id: number,
    name?: string,
    manufacturer?: string
  ): Promise<Console | null> {
    const console = await Console.findByPk(id);
    if (console) {
      if (name) console.name = name;
      if (manufacturer) console.manufacturer = manufacturer;
      await console.save();
      return console;
    }
    return notFound("console");
  }
}

export const consoleService = new ConsoleService();
