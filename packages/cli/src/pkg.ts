import { findUpSync } from "find-up";

import { readJsonSync } from "./utils";

type Task = string | string[] | Record<string, string | string[]>;

class Pkg {
  path: string;
  tasks: Record<string, Task>;

  constructor() {
    this.path = findUpSync("package.json") as string;
    const pkg = readJsonSync(this.path) as Omit<Pkg, "path">;

    this.tasks = pkg.tasks || {};
  }
}

export const pkg = new Pkg();
