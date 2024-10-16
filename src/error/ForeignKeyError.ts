export function foreignKeyError(name: string): never {
    const error = new Error(name + " Pre-condition failed: FK exist");
    (error as any).status = 412;
    throw error;
  }
  