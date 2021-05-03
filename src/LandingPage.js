/* eslint-disable */
import React from 'react';
import './css/styles.css';


export function LandingPage() {
  return (
    <div>
      <div>
        <p> </p>
      </div>
      <div>
        <section class="bg-md-light" id="services"> 
          <div class="container">
            <div class="text-center">
              <h1>Services</h1>
              <p>This is an event discovery app - EventGuru! We aim to deliver an event discovery and searching app accessible form the browser. This app will provide uses with the ability to view events, look up the event venue on a map, bookmark events, and interact (like and comment on) with events.</p>
              <p> </p>
            </div>
            <div class="row text-center">
              <div class="col-md-4">
                  <h2>Search & Filter Events</h2>
                  <p>On this web app, you can enter keywords for events you want to search for. You can also filter the events list by adding filter keywords to generate a more refined search!</p>
              </div>
              <div class="col-md-4">
                <h2>Bookmark Events</h2>
                <p>If you like an event and want to view the details of this event in the future, the web app will allow you to bookmark the event. You can view all of your bookmarked events in your account at any point in time!</p>
              </div>
              <div class="col-md-4">
                <h2>Interact with Events</h2>
                <p>For every event, you can like or dislike, and comment on the event. Your comments will show up with you Google account name as the tag. You can interact with other users by leaving comments under events.</p>
              </div>
            </div>
          </div>
        </section>
        <section class="bg-light" id="about"> 
          <div class="container">
            <div class="text-center">
              <h1>About</h1>
              <p> </p>
            </div>
            <div class="row text-center">
              <div class="col-md-6">
                  <h3>Why does it matter?</h3>
                  <p>Our web app was made so that users can utilize its functions to search for events and interact with the events on a simple platform. All users can use this platform by simply just logging in and browsing through the list of events powered by TicketMaster; users can explore many events both locally and worldwide that suit their needs. It is easy to use, provides many funcitonalities, and allows for interaction.</p>
              </div>
              <div class="col-md-6">
                <h3>How is it different?</h3>
                <p>Our web app is different from other platforms because it allows for user interaction with individual events. On similar web apps, like TicketMaster and EventBrite, users do not have thr option to react to events and/or add comments to events. Our web app allows users to do both. Additionally, in order to use other similar web apps, users have to make an account on the platform to use the services. With our web app, users will simply have to login using their Google accounts to use all functionalities to the fullest extent.</p>
              </div>
            </div>
          </div>
        </section>
        <section class="bg-md-light" id="team"> 
          <div class="container">
            <div class="text-center">
              <h1>Team</h1>
              <h2>This is the amazing team that created this web app!</h2>
              <p> </p>
            </div>
            <div class="row text-center">
              <div class="col-md-3">
                  <h3>Pranavi Parsi</h3>
                  <p>Pranavi is a junior studying Computer Science and Business at NJIT. She was responsible for creating this landing page, the filter events funtionality, and the local events generation upon login functionality.</p>
              </div>
              <div class="col-md-3">
                <h3>Kevin Pereira</h3>
                <p>Kevin is a senior studying Computer Science at NJIT. He was responsible for creating the bookmarks functionality and the map feature functionality.</p>
              </div>
              <div class="col-md-3">
                  <h3>Ivana Zdravevska</h3>
                  <p>Ivana is a senior studying Computer Science at NJIT. She was responsible for the search events funcitonality and the like functionality.</p>
              </div>
              <div class="col-md-3">
                  <h3>Xavier Vargas</h3>
                  <p>Xavier is a senior studying Computer Science at NJIT. He was repsonible for the login funcitonality and the comment functionality.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
export default LandingPage;
