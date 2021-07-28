import Navbar from '../components/Navbar';
import styles from '../styles/Report.Module.css';
import { Redirect } from "react-router-dom";
import LoadingScreen from '../components/LoadingScreen';
import ErrorScreen from '../components/ErrorScreen';
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { GET_SELECTED_HOTSPOT } from "../apis/hotspotApis";
import { CAST_VOTE_API } from "../apis/voteApis";

const Report = () => {
  let { id } = useParams();
  const ratings = ['Quiet', 'Comfortable', 'Crowded'];

  // Loading the data from the hotspot
  const { loading: loadingHotspot, data: dataHotspot, error: errorHotspot } = useQuery(GET_SELECTED_HOTSPOT, {
    fetchPolicy: "network-only",
    variables: { id },
    onError(error) {
      alert("Failed to load hotspots, Refresh The page!");
    },
    onCompleted(data) {
      //console.log(data);
    },
  });

  const [castVote, {loading: loadingVote, data: dataVote, error: errorVote}] = useMutation(CAST_VOTE_API);

  // Adding the rating to the database
  const handleClickRating = e => {
    castVote({
      variables: {
        input: {
          vote_value: e.currentTarget.value,
          hotSpotID: id
        }
      }
    });
  };

  if (dataVote) {
    return <Redirect to={`/confirm/${dataHotspot.SelectedHotspot.hotspot_name}/${dataVote.VoteCreation.vote.vote_value}`} push />
  }

  // When the hotspot is loading...
  if (loadingHotspot) {
    return (
      <section className={styles.container}>
        <Navbar previous="/scan" title="Crowdedness" />
        <LoadingScreen text="Loading hotspot" />
      </section>
    );
  }

  // When an error has occured
  if (errorHotspot) {
    return (
      <section className={styles.container}>
        <Navbar previous="/scan" title="Crowdedness" />
        <ErrorScreen text="Failed to load hotspot" />
      </section>
    );
  }
  
  if (dataHotspot) {
    return (
      <section className={styles.container}>
        <Navbar previous="/scan" title="Crowdedness" />
        <div className={styles.content}>
          <div className={styles.info}>
            <p className={styles.hotspot}>{dataHotspot.SelectedHotspot.hotspot_name}</p>
            <p className={styles.question}>How crowded is it here?</p>
          </div>
          {loadingVote ? <p className={styles.loading}>Casting vote</p> : (
            <div className={styles.rating__container}>
              <div className={styles.rating__header}>
                <p className={styles.rating__header__item}>{ratings[0]}</p>
                <p className={styles.rating__header__item}>{ratings[ratings.length - 1]}</p>
              </div>
              <form className={styles.ratings} method="post">
                {ratings.map((rating, index) => (
                  <div className={styles.rating} key={index}>
                    <input className={styles.rating__input} type="radio" name="rating" id={rating} value={index + 1} onChange={handleClickRating} />
                    <label className={styles[`btn__rating__icon__${(index + 1).toString().padStart(2, '0')}`]} htmlFor={rating} />
                  </div>
                ))}
              </form>
              {errorVote ? <p className={styles.error}>Something went wrong</p> : ''}
            </div>
          )}
          <a href="https://github.com/osoc21/Crowdy" className={styles.about}>
            <p className={styles.btn__tertiary}>What is Crowdy?</p>
          </a>
        </div>
      </section>
    );
  }
}
 
export default Report;