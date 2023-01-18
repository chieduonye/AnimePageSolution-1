import { useAppDispatch, useAppSelector } from '../app/hooks';
import { updatedAnimeItems } from "../features/getAnimeSlice";
import { AnimeCardData, getAnimeResponse } from "../models/api/GetAnime";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import  styles from "./AnimeItems.module.css";


const GetAnimeData = () => {
  const dispatch = useAppDispatch();
  const animeItems = useAppSelector((state) => state.animeItems.animeItems);

  getAnimeResponse().then((animeItems) => { 
      dispatch(updatedAnimeItems(animeItems));
    });

  interface animeDataInterface {
    title: string,
    year: number;
    titleLength: number;
  }
  
  const yearArray = Object.values(animeItems).sort(function(a, b) {return a.rank - b.rank}).slice(0, 20).map(function(animeItem: AnimeCardData) { return animeItem["year"]; });
  const titleArray = Object.values(animeItems).sort(function(a, b) {return a.rank - b.rank}).slice(0, 20).map(function(animeItem: AnimeCardData) { return animeItem["title"]; });
  const InitialTitleLength = 1
 
  // Extract year, number of titles that year had as "titleLength", title, as the keys into one Json
  const mapArrays = (titleArray: Array<string>, yearArray: Array<number>, titleLe: number) => { 
    const animeData = []; 
    for(let i = 0; i < titleArray.length; i++){ 
    if(yearArray[i] !== null) {
      animeData.push({ 
          title: titleArray[i], 
          titleLength: 1,
          year: yearArray[i] 
      }); 
    }}; 
    return animeData; 
  }; 
  
  const animeTempData = mapArrays(titleArray, yearArray, InitialTitleLength);

  // aggregate all titles with the same year into one object, and account for it within "titleLength"
  const aggregateArray = (arr: Array<animeDataInterface>) => {
    return arr.reduce((acc: Array<animeDataInterface>, val) => {
      const index = acc.findIndex(obj => obj.year === val.year);
      if(index !== -1){
        acc[index].title += "\n";
        acc[index].title += val.title;   
        acc[index].titleLength += val.titleLength;   
      }else{
          acc.push({
            year: val.year,
            titleLength:  val.titleLength,
            title: val.title.split("\n").join("<br />")
          });
      };
      return acc;
    }, []);
  };
  const animeData = aggregateArray(animeTempData);
  console.log(animeData);
  return animeData;
}

const CustomTooltip = ({ active, payload}: any) => {
  if (active && payload && payload.length) {
    return (
      <div style= {{margin: '10px'}}>
       <p className={styles.payloadYear} >{`${payload[0].payload?.year}`}</p>
       <p className={styles.payloadTitle} >{`${payload[0]?.payload?.title}`}</p>
      </div>
    )
   }

  return null
}

export const AnimeChart = () => {

  const animeData = GetAnimeData();

    return (
    <>
      {/* <ResponsiveContainer width={100%} aspect {3} > */}
      {/* ResponsiveContainer not rendering */}
      <div className={styles.caption}>
      <div className={styles.fullCaption}>
      <AreaChart width={1260} height={260} data={animeData}
        margin={{ top: 30, right: -100, left: 0.1, bottom: 30 }}
        >
        <defs>
          <linearGradient id="colortitleLength" x1="0" y1="0" x2="1" y2="0">
            <stop offset="3%" stopColor="#4fee8c" stopOpacity={0.8}/>
            <stop offset="82%" stopColor="#8884d8" stopOpacity={0.6}/>
          </linearGradient>
        </defs>
        <XAxis dataKey="year" />
        <YAxis />
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <Tooltip content={<CustomTooltip />}  wrapperStyle={{ backgroundColor: 'white', color: 'black', alignItems:'center'}}         />
        <Area type="monotone" dataKey="titleLength" stroke="#8884d8" fillOpacity={1} fill="url(#colortitleLength)" />
      </AreaChart>
      </div>
      </div>
      {/* </ResponsiveContainer> */}
      </>
    );
};



