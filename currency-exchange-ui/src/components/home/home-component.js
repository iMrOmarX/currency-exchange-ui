import React from 'react';
import ConvertSection from '../convert/convert-section-component';
import './home-component.css'

function Home() {
  return (<section id='home-section'>
      <div class="home-content center">
          <h1>The World's Trusted Currency Authority</h1>
          <p>Check exchange rates, send money internationally, and free currency tools</p>
          <ConvertSection></ConvertSection>
      </div>
      
  </section>);
}

export default Home;
