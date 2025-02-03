// import React from 'react'

import CallToAction from "../../Components/student/CallToAction"
import Companies from "../../Components/student/Companies"
import CoursesSection from "../../Components/student/CoursesSection"
import Footer from "../../Components/student/Footer"
import Hero from "../../Components/student/Hero"
import TestimonialsSection from "../../Components/student/TestimonialsSection"

const Home = () => {
  return (
    <div className="flex flex-col items-center space-y-7 text-center">
        <Hero />
        <Companies />
        <CoursesSection />
        <TestimonialsSection />
        <CallToAction />
        <Footer />
    </div>
  )
}

export default Home