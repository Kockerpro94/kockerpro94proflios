import FileSystemBash, { FileSystemType } from "../fileSystemBash";

export default function mv(
  print: (s: string, md?: boolean) => void,
  path: FileSystemType
) {
  const fileSystem = FileSystemBash();
  const docs = {
    name: "mv",
    short: "move (rename) files",
    long: "",
  };

  const app = (args: string[], options: string[]) => {
    if (options.find((o) => o === "-h" || o === "--help")) {
      print(`\n${docs.name} – ${docs.short}`);
      return;
    }

    if (args.length < 2) {
      print(`\nmv: missing file operand`);
      return;
    }

    const source = args[0];
    const target = args[1];

    const result = fileSystem.mv(path.p, source, target);
    if (result === "bad_source") {
      print(`\nmv: cannot stat '${source}': No such file or directory`);
    } else if (result === "bad_target") {
      print(`\nmv: cannot move '${source}' to '${target}': No such directory`);
    } else if (result === "file_exists") {
      print(`\nmv: cannot overwrite '${target}': File exists`);
    }
  };
  return { docs, app };
}
