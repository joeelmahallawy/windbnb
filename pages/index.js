import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import stays from "../../stays.json";
import logo from "../../logo.png";
import classnames from "classnames";
import { property } from "lodash";
import nextConfig from "../next.config";

function PropertyCard({ arr }) {
  return arr.map((property, i) => {
    console.log(property);
    return (
      <div
        className={classnames({
          [styles.propertyContainer]: true,
        })}
        key={i}
      >
        <div
          className={classnames({
            [styles.propertyCard]: true,
          })}
        >
          <div
            className={classnames({
              [styles.propPhotosContainer]: true,
            })}
          >
            <img
              src={property.photo}
              className={classnames({ [styles.propPhotos]: true })}
            />
          </div>
          <div className={classnames({ [styles.propDetails]: true })}>
            {property.superHost && (
              <div className={classnames({ [styles.superHost]: true })}>
                <h5 className={classnames({ [styles.superHostHeading]: true })}>
                  SUPER HOST
                </h5>
              </div>
            )}
            <div className={classnames({ [styles.type]: true })}>
              {property.type}
            </div>
            <span class="material-icons">&#xf0ec;</span>
          </div>
          <div className={classnames({ [styles.propDescriptions]: true })}>
            <h4 className={classnames({ [styles.propTitle]: true })}>
              {" "}
              {property.title}
            </h4>
          </div>
        </div>
      </div>
    );
  });
}

// function PropertyCard({ arr, prop }) {
//   return (
//     <>
//       {arr.map((property, i) => {
//         return (
//           <div
//             className={classnames({
//               [styles.propertyContainer]: true,
//             })}
//             key={i}
//           >
//             {property.city}
//             <div
//               className={classnames({
//                 [styles.propPic]: true,
//               })}
//             ></div>
//             <div></div>
//             <div></div>
//           </div>
//         );
//       })}
//     </>
//   );

function Search({ func }) {
  return <button></button>;
}

export default function Home() {
  console.log(stays);
  return (
    <>
      <Head>
        <title>Windbnb</title>
      </Head>
      <div
        className={classnames({
          [styles.navigator]: true,
        })}
      >
        <div
          className={classnames({
            [styles.Container]: true,
          })}
        >
          <Image className={classnames({ [styles.logo]: true })} src={logo} />
        </div>

        <div
          className={classnames({
            [styles.searchBar]: true,
          })}
        >
          <button
            className={classnames({ [styles.locationBtn]: true })}
          ></button>
          <button className={classnames({ [styles.guestsBtn]: true })}></button>
        </div>
      </div>
      <div
        className={classnames({ [styles.currentSearchLocation]: true })}
      ></div>
      <div
        className={classnames({
          [styles.fullPropSectionContainer]: true,
        })}
      >
        <PropertyCard arr={stays} />
      </div>
    </>
  );
}
