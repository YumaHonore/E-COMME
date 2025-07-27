import React from 'react';
// import HeroSection from '../components/Sections/HeroSections';
import HeroSections from '@/components/Sections/HeroSections';
import HistorySection from '../components/Sections/HistorySection';
import TeamSection from '../components/Sections/TeamSection';
import ValuesSection from '@/components/Sections/ValueSection';
// import ValuesSection from '../components/Sections/ValuesSection';
import CTASection from '../components/Sections/CTASection';

const AboutUs = () => {
  return (
    <div>
      <HeroSections />
      <HistorySection />
      <TeamSection />
      <ValuesSection />
      <CTASection />
    </div>
  );
};

export default AboutUs;
