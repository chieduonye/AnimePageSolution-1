import { useAppDispatch, useAppSelector } from '../app/hooks';
import { updatedAnimeItems } from "../features/getTopAnimeSlice";
import { AnimeCardData, getTopAnimeResponse } from "../models/api/GetTopAnime";
import styles  from "./AnimeItems.module.css";

export function AnimeList() {

  const ReturnDateString = (a:number, b:number,c:number) => {
    return new Date(a, b-1, c).toDateString();
   }

  const dispatch = useAppDispatch();
  const animeItems = useAppSelector((state) => state.animeItems.animeItems);

  getTopAnimeResponse().then((animeItems) => {
      dispatch(updatedAnimeItems(animeItems));
              // console.log(animeItems)
    });

   
  return (
    <>
      <ul className={styles.animeItems}>
        {Object.values(animeItems).slice(0, 20).map((animeCardItem: AnimeCardData)=> (

          <li key={animeCardItem.rank} className={styles.zoom} >
          <div className={styles.mainContainer}>
            <img src={animeCardItem.images.jpg.image_url} alt={animeCardItem.images.jpg.image_url} className={styles.animeImage}  />
            <div className={styles.animeRank} >{animeCardItem.rank}</div>
            <div className={styles.animeTitle} >{animeCardItem.title}</div>
          </div>
          <div className={styles.subContainer} >
            <div className={styles.subContainerBody} >
              <div  className={styles.subContainerKey}  >
                Release :
              </div>
              <div className={styles.subContainerValue} >
                {ReturnDateString(animeCardItem.aired.prop.to.year,animeCardItem.aired.prop.to.month,animeCardItem.aired.prop.to.day)}
              </div>
            </div>
            <div className={styles.subContainerBody} >
              <div className={styles.subContainerKey}   >
                Latest :
              </div>
              <div className={styles.subContainerValue}> 
                {animeCardItem.aired.prop.to === null || animeCardItem.aired.prop.to === undefined || animeCardItem.airing === true ? <p>now</p>:
                  ReturnDateString(animeCardItem.aired.prop.to.year,animeCardItem.aired.prop.to.month,animeCardItem.aired.prop.to.day)}             
              </div>
            </div>
            <div className={styles.subContainerBody}>
              <div className={styles.subContainerKey} style={{display:'inline'}} >Rating:</div> 
              <div className={styles.subContainerValue}>{animeCardItem.rating}</div>
            </div>
          </div>         
        </li>
        ))}
      </ul>
    </>
  );
}
