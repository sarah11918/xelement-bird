import React from "react";

export default function NotableBirdList(props) {
  let listOfPendingNotableBirds = [];
  let listOfValidNotableBirds = [];

  const notReviewed = props.birdList.filter((bird) => !bird.obsReviewed);

  const reviewedAndValid = props.birdList.filter(
    (bird) => bird.obsReviewed && bird.obsValid
  );

  const reviewedButNotValid = props.birdList.filter(
    (bird) => bird.obsReviewed && !bird.obsValid
  );

  for (let i = 0; i < notReviewed.length; i++) {
    if (!listOfPendingNotableBirds.includes(notReviewed[i].comName)) {
      listOfPendingNotableBirds.push(notReviewed[i].comName);
    }
  }

  for (let i = 0; i < reviewedAndValid.length; i++) {
    if (!listOfValidNotableBirds.includes(reviewedAndValid[i].comName)) {
      listOfValidNotableBirds.push(reviewedAndValid[i].comName);
    }
  }

  const notReviewedDivs = listOfPendingNotableBirds.map((bird, index) => (
    <li key={index} className="birdPending">
      {bird}
    </li>
  ));

  const reviewedAndValidDivs = listOfValidNotableBirds.map((bird, index) => (
    <li key={index} className="birdVerified">
      {bird}
    </li>
  ));

  const reviewedButNotValidDivs = reviewedButNotValid.map((bird) => (
    <li key={bird.comName}>{bird.comName}</li>
  ));

  let birdsPendingDivs = notReviewed.map((bird) => {
    let checklistURL = `https://ebird.org/checklist/${bird.subId}`;

    return (
      <div
        key={bird.obsId}
        className="birdPending"
        style={{ color: "#3d5262" }}
      >
        <p style={{ fontSize: "1.2rem" }}>
          {bird.comName} - {bird.howMany ? bird.howMany : `present`}
        </p>
        <p style={{ fontSize: "0.85rem" }}>
          {bird.obsDt} by {bird.userDisplayName}
        </p>
        <p style={{ fontSize: "0.75rem" }}>
          Checklist: <a href={checklistURL}>{bird.subId}</a>
        </p>
        <hr />
      </div>
    );
  });

  let birdsVerifiedDivs = reviewedAndValid.map((bird) => {
    let checklistURL = `https://ebird.org/checklist/${bird.subId}`;

    return (
      <div key={bird.obsId} className="birdVerified">
        <p style={{ fontSize: "1.2rem" }}>
          {bird.comName} - {bird.howMany ? bird.howMany : `present`}
        </p>
        <p style={{ fontSize: "0.85rem" }}>
          {bird.obsDt} by {bird.userDisplayName}
        </p>
        <p style={{ fontSize: "0.75rem" }}>
          Checklist: <a href={checklistURL}>{bird.subId}</a>
        </p>
        <hr />
      </div>
    );
  });

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <h4>Birds Awaiting Review</h4>
          {birdsPendingDivs.length > 0 ? (
          <ul style={{ listStyleType: "none", paddingLeft: "0" }}>
            {notReviewedDivs}
          </ul>
          ) : (
            "none"
          )}
        </div>
        <div>
          <h4>Birds Recently Confirmed</h4>
          {birdsVerifiedDivs.length > 0 ? (
          <ul style={{ listStyleType: "none", paddingLeft: "0" }}>
            {reviewedAndValidDivs}
          </ul>
          ) : (
        "none"
      )}
        </div>
      </div>
      <hr />
      <details id="observation-details">
          <summary style={{fontStyle: "italic"}}>Show Detailed Observation Reports</summary>
          <div style={{backgroundColor: "#eef9ed", padding: "1em"}}>

      <h2>Sightings Not Yet Verified / Pending Review:</h2>
      {birdsPendingDivs.length > 0 ? (
        <ul id="pendingSightings" style={{ paddingLeft: "0" }}>
          {birdsPendingDivs}
        </ul>
      ) : (
        "none"
      )}
      <h2>Confirmed Sightings:</h2>

      {birdsVerifiedDivs.length > 0 ? (
        <ul id="verifiedSightings" style={{ paddingLeft: "0" }}>
          {birdsVerifiedDivs}
        </ul>
      ) : (
        "none"
      )}
        
        </div>
        </details>
    </>
  );
}