import FileSystemBash, { FileSystemType } from "../fileSystemBash";

export default function rm(
  print: (s: string, md?: boolean) => void,
  path: FileSystemType
) {
  const fileSystem = FileSystemBash();
  const docs = {
    name: "rm",
    short: "remove files or directories",
    long: "",
  };

  const app = (args: string[], options: string[]) => {
    if (options.find((o) => o === "-h" || o === "--help")) {
      print(`\n${docs.name} – ${docs.short}`);
      return;
    }

    if (args.length === 0) {
      print(`\nrm: missing operand`);
      return;
    }

    let allText = "";
    for (const target of args) {
      const result = fileSystem.rm(path.p, target);
      if (result === "bad_path") {
        allText += `\nrm: cannot remove '${target}': No such file or directory`;
      }
    }
    
    if (allText) print(allText, false);
  };
  return { docs, app };
}
