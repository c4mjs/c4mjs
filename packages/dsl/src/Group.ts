import { XmlObject } from "xml";
import { System } from "./System";
import { Person } from "./Person";
import { addLazySetup } from "./LazySetup";

export class Group {
  protected readonly name;

  protected readonly people: Person[];

  protected readonly systems: System[];

  constructor(name) {
    this.name = name;
    this.people = [];
    this.systems = [];
  }

  person(name: string, setup?: (person: Person) => void): Person {
    const person = new Person(name);
    setup && addLazySetup(() => setup(person));
    this.people.push(person);
    return person;
  }

  system(name: string, setup?: (system: System) => void): System {
    const system = new System(name);
    setup && addLazySetup(() => setup(system));
    this.systems.push(system);
    return system;
  }

  toXmlObject(): XmlObject {
    return {
      [Group.name]: [
        { _attr: { name: this.name } },
        ...this.people.map((it) => it.toXmlObject()),
        ...this.systems.map((it) => it.toXmlObject()),
      ],
    };
  }
}
