import type { FolderProps } from "@/_components/cards/Folder/comp.tsx";
import type { ImageProps } from "@/_components/cards/Image.tsx";
import type { MapProps } from "@/_components/cards/Map/comp.tsx";
import type { NoteProps } from "@/_components/cards/Note/comp.tsx";
import type { TextProps } from "@/_components/cards/Text.tsx";
import type { TodoProps } from "@/_components/cards/Todo.tsx";
import type { SectionProps } from "@/_components/Section.tsx";
import { CardProps } from "./Card.tsx";
import { LinkProps } from "./cards/Link.tsx";
import { TelegramProps } from "./cards/Telegram.tsx";
import { GridProps } from "./Grid.tsx";
import { ProfileProps } from "./Profile.tsx";

type FolderComponent = FolderProps & {
  folder: null;
};

type ImageComponent = ImageProps & {
  image: null;
};

type MapComponent = MapProps & {
  map: null;
};

type NoteComponent = NoteProps & {
  note: null;
};

type TelegramComponent = TelegramProps & {
  telegram: null;
};

type TextComponent = TextProps & {
  text: null;
};

type TodoComponent = TodoProps & {
  todo: null;
};

type LinkComponent = LinkProps & {
  link: null;
};

export type CompProps = {
  Card: (props: CardProps) => JSX.Children;
  Grid: (props: GridProps) => JSX.Children;
  Profile: (props: ProfileProps) => JSX.Children;
  Section: (props: SectionProps) => JSX.Children;
  cards: {
    Folder: (props: FolderProps) => JSX.Children;
    Map: (props: MapProps) => JSX.Children;
    Note: (props: NoteProps) => JSX.Children;
    Image: (props: ImageProps) => JSX.Children;
    Telegram: (props: TelegramProps) => JSX.Children;
    Text: (props: TextProps) => JSX.Children;
    Todo: (props: TodoProps) => JSX.Children;
  };
};

export type Component =
  | FolderComponent
  | ImageComponent
  | LinkComponent
  | MapComponent
  | NoteComponent
  | SectionProps
  | TextComponent
  | TodoComponent;
