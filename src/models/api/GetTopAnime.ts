const getTopAnimeAPI = "https://api.jikan.moe/v4/top/anime";

export interface AnimeCardData {
  mal_id: number;
      url: string;
      images: {
        jpg: {
          image_url: string;
          small_image_url: string;
          large_image_url: string
        },
        webp: {
          image_url: string;
          small_image_url: string;
          large_image_url: string
        }
      },
      trailer: {
        youtube_id: string;
        url: string;
        embed_url: string
      },
      approved: boolean;
      titles: [
        {
          type: string;
          title: string;
        }
      ],
      title: string;
      title_english: string;
      title_japanese: string;
      title_synonyms: [
        string
      ];
      type: string;
      source: string;
      episodes: number;
      status: string;
      airing: true,
      aired: {
        from: string,
        to: string,
        prop: {
          from: {
            day: number;
            month: number;
            year: number
          },
          to: {
            day: number,
            month: number,
            year: number
          },
          string: string
        }
      },
      duration: string;
      rating: string;
      score: number;
      scored_by: number;
      rank: number;
      popularity: number;
      members: number;
      favorites: number;
      synopsis: string;
      background: string;
      season: string;
      year: number;
      broadcast: {
        day: string;
        time: string;
        timezone: string;
        string: string;
      },
      producers: [
        {
          mal_id: number;
          type: string;
          name: string;
          url: string
        }
      ],
      licensors: [
        {
          mal_id: number;
          type: string;
          name: string;
          url: string;
        }
      ],
      studios: [
        {
          mal_id: number;
          type: string;
          name: string;
          url: string
        }
      ],
      genres: [
        {
          mal_id: number;
          type: string;
          name: string;
          url: string
        }
      ],
      explicit_genres: [
        {
          mal_id: number;
          type: string;
          name: string;
          url: string;
        }
      ],
      themes: [
        {
          mal_id: number;
          type: string;
          name: string;
          url: string
        }
      ],
      demographics: [
        {
          mal_id: number;
          type: string;
          name: string;
          url: string
        }
      ]
};

export interface AnimeCardArray {
  // sort(arg0: (a: any, b: any) => number): AnimeCardArray;
  data: Array<AnimeCardData> | [];
  pagination: any;
}

export type AnimeItems = { [animeID: string]: number };
export type GetAnimeResponse = { success: boolean; error?: string };

export async function getTopAnimeResponse(): Promise<AnimeCardArray> { 
  const results = await fetch(getTopAnimeAPI);
  const animeItems = results.json();
  return animeItems;
  
}
