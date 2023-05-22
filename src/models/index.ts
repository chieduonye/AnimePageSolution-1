import { Status as StatusInterface, GenericState as GenericStateInterface } from './common/GenericState';
import { Subpage as SubpageInterface, Page as PageInterface, RootModule as RootModuleInterface } from './common/RootModule';

import {
    AnimeCardData as AnimeCardDataInterface,
  } from './api/GetTopAnime';

export type Status = StatusInterface;
export type GenericState<T> = GenericStateInterface<T>;
export type Subpage = SubpageInterface;
export type Page = PageInterface;
export type RootModule = RootModuleInterface;
export type AnimeCardData = AnimeCardDataInterface;