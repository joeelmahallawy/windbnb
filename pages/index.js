import React, { useState, useRef } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import stays from "../../stays.json";
import logo from "../../logo.png";
import classnames from "classnames";
import { VscStarFull } from "react-icons/vsc";
import { IoMdSearch } from "react-icons/io";
import { MdPlace, MdClose } from "react-icons/md";
import { Modal, Button, Form } from "react-bootstrap";
import { set } from "lodash";
import { first } from "lodash";
// import "bootstrap/dist/css/bootstrap.css";

export default function Home() {
  const [options, setOptions] = React.useState(false);

  function PropertyCard({ arr }) {
    return arr.map((property, i) => {
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
                  <h5
                    className={classnames({ [styles.superHostHeading]: true })}
                  >
                    SUPER HOST
                  </h5>
                </div>
              )}
              <div className={classnames({ [styles.type]: true })}>
                {property.type}

                {`: ${property.maxGuests} guests maximum`}
              </div>
              <div className={classnames({ [styles.ratingsContainer]: true })}>
                <VscStarFull
                  className={classnames({ [styles.ratingIcon]: true })}
                />
                <div className={classnames({ [styles.rate]: true })}>
                  {property.rating}
                </div>
              </div>
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

  function RenderResults(locationSearch, guestsSearch) {
    const resultsArr = stays.filter((prop) => {
      return (
        prop.city == locationSearch.split(", ")[0] &&
        prop.maxGuests >= guestsSearch
      );
    });
    return <PropertyCard arr={resultsArr} />;
  }

  const [curLocation, setCurLocation] = useState("Choose, location");
  const [adultCounter, setAdultCounter] = React.useState(0);
  const [childrenCounter, setChildrenCounter] = React.useState(0);
  function Search({ ops }) {
    const [locationState, setLocationState] = React.useState(true);
    const [guestState, setGuestState] = React.useState(false);
    const [showOptions, setShowOptions] = useState(ops);
    return (
      <>
        {showOptions && (
          <div className={classnames({ [styles.parentOfModal]: true })}>
            <div
              className={classnames({ [styles.searchOptionsContainer]: true })}
            >
              <button
                className={classnames({ [styles.closeSearch]: true })}
                onClick={() => setShowOptions(!showOptions)}
              >
                <MdClose size="80%" color="white" />
              </button>
              <div className={classnames({ [styles.searchFields]: true })}>
                <button
                  className={classnames({ [styles.locationFiller]: true })}
                  onClick={() => {
                    setLocationState(true);
                    setGuestState(false);
                  }}
                >
                  <h4 className={classnames({ [styles.barLocation]: true })}>
                    LOCATION
                  </h4>
                  <p className={classnames({ [styles.curLocation]: true })}>
                    {curLocation}
                  </p>
                </button>

                <button
                  className={classnames({ [styles.guestFiller]: true })}
                  onClick={() => {
                    setGuestState(true);
                    setLocationState(false);
                  }}
                >
                  <h4 className={classnames({ [styles.barLocation]: true })}>
                    GUESTS
                  </h4>
                  <p className={classnames({ [styles.curLocation]: true })}>
                    {adultCounter + childrenCounter != 1
                      ? `${adultCounter + childrenCounter} guests`
                      : `${adultCounter + childrenCounter} guest`}
                  </p>
                </button>
                {/* FIXME:FIXME:FIXME: */}
                <button>
                  <div
                    className={classnames({ [styles.searchSearch]: true })}
                    onClick={() => {
                      RenderResults(
                        curLocation,
                        adultCounter + childrenCounter
                      );
                      setShowOptions(!showOptions);
                    }}
                  >
                    <IoMdSearch size="50px" />
                    <h2>Search</h2>
                  </div>
                </button>
              </div>

              <div className={classnames({ [styles.options]: true })}>
                {locationState && (
                  <ul
                    className={classnames({ [styles.locationOptions]: true })}
                  >
                    <li>
                      <MdPlace
                        className={classnames({ [styles.locationIcons]: true })}
                        size="7%"
                      />
                      <button
                        className={classnames({
                          [styles.locationSelections]: true,
                        })}
                        onClick={(e) => setCurLocation(e.target.innerText)}
                      >
                        Helsinki, Finland
                      </button>
                    </li>
                    <li>
                      <MdPlace
                        className={classnames({ [styles.locationIcons]: true })}
                        size="7%"
                      />
                      <button
                        className={classnames({
                          [styles.locationSelections]: true,
                        })}
                        onClick={(e) => setCurLocation(e.target.innerText)}
                      >
                        Turku, Finland
                      </button>
                    </li>
                    <li>
                      <MdPlace
                        className={classnames({ [styles.locationIcons]: true })}
                        size="7%"
                      />
                      <button
                        className={classnames({
                          [styles.locationSelections]: true,
                        })}
                        onClick={(e) => setCurLocation(e.target.innerText)}
                      >
                        Oulu, Finland
                      </button>
                    </li>
                    <li>
                      <MdPlace
                        className={classnames({ [styles.locationIcons]: true })}
                        size="7%"
                      />
                      <button
                        className={classnames({
                          [styles.locationSelections]: true,
                        })}
                        onClick={(e) => setCurLocation(e.target.innerText)}
                      >
                        Vaasa, Finland
                      </button>
                    </li>
                  </ul>
                )}

                {guestState && (
                  <div className={classnames({ [styles.guestOptions]: true })}>
                    <div
                      className={classnames({ [styles.adultContainer]: true })}
                    >
                      <div className={classnames({ [styles.adults]: true })}>
                        Adults
                      </div>
                      <div className={classnames({ [styles.ages]: true })}>
                        Ages 13 or above
                      </div>
                      <div
                        className={classnames({ [styles.adultCounter]: true })}
                      >
                        <button
                          className={classnames({ [styles.decrement]: true })}
                          onClick={() =>
                            setAdultCounter(adultCounter && adultCounter - 1)
                          }
                        >
                          &mdash;
                        </button>
                        <div
                          className={classnames({ [styles.counters]: true })}
                        >
                          {adultCounter}
                        </div>
                        <button
                          className={classnames({ [styles.increment]: true })}
                          onClick={() => setAdultCounter(adultCounter + 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className={classnames({ [styles.children]: true })}>
                      Children
                    </div>
                    <div className={classnames({ [styles.ages]: true })}>
                      Ages 12 and under
                    </div>
                    <div
                      className={classnames({ [styles.childrenCounter]: true })}
                    >
                      <button
                        className={classnames({ [styles.decrement]: true })}
                        onClick={() =>
                          setChildrenCounter(
                            childrenCounter && childrenCounter - 1
                          )
                        }
                      >
                        &mdash;
                      </button>
                      <div className={classnames({ [styles.counters]: true })}>
                        {childrenCounter}
                      </div>
                      <button
                        className={classnames({ [styles.increment]: true })}
                        onClick={() => setChildrenCounter(childrenCounter + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div
              className={classnames({ [styles.searchOptionsBackground]: true })}
              onClick={() => setShowOptions(!showOptions)}
            ></div>
          </div>
        )}
      </>
    );
  }

  // console.log(resultsArr);
  // console.log(newArr);

  return (
    <>
      <Head>
        {function RenderResults(locationSearch, guestsSearch) {
          const resultsArr = stays.filter((prop) => {
            return (
              prop.city == locationSearch.split(", ")[0] &&
              prop.maxGuests >= guestsSearch
            );
          });
          return resultsArr;
        }}
        <title>Windbnb</title>
      </Head>
      {options && <Search ops={options} />}
      <div
        className={classnames({
          [styles.navigator]: true,
        })}
      >
        <div
          className={classnames({
            [styles.logoContainer]: true,
          })}
        >
          <Image
            className={classnames({ [styles.logo]: true })}
            src={logo}
            height={30}
            width={130}
          />
        </div>
        <div
          className={classnames({
            [styles.searchBar]: true,
          })}
        >
          <button
            className={classnames({ [styles.locationBtn]: true })}
            onClick={() => {
              setOptions(!options);
            }}
          >
            Add Location
          </button>
          <button
            className={classnames({ [styles.guestsBtn]: true })}
            onClick={() => {
              setOptions(!options);
            }}
          >
            Add Guests
          </button>
          <button
            className={classnames({ [styles.searchBtn]: true })}
            onClick={() => setOptions(!options)}
          >
            <IoMdSearch className={classnames({ [styles.searchIcon]: true })} />
          </button>
        </div>
      </div>
      <div
        className={classnames({ [styles.currentSearchLocation]: true })}
      ></div>
      <div className={classnames({ [styles.stayInFinland]: true })}>
        <h2>Stays in Finland</h2>
      </div>
      <div
        className={classnames({
          [styles.fullPropSectionContainer]: true,
        })}
      >
        {/* <RenderResults /> */}
        {/* FIXME:FIXME:FIXME: */}
        {/* <PropertyCard arr={resultsArr} /> */}

        <PropertyCard arr={stays} />
        {/* <PropertyCard arr={resultsArr} /> */}
        {/* {console.log(adultCounter + childrenCounter)} */}
        {/* <RenderResults
          locationSearch={curLocation}
          guestsSearch={adultCounter + childrenCounter}
        /> */}
        {/* {console.log(curLocation)} */}
        {/* <RenderResults
          locationSearch={curLocation}
          guestsSearch={adultCounter + childrenCounter}
        /> */}
      </div>
    </>
  );
}
