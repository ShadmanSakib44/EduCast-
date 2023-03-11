import React from 'react'
import Icon1 from '../../images/svg-1.svg'
import Icon2 from '../../images/svg-2.svg'
import Icon3 from '../../images/svg-3.svg'
import {ServicesContainer, ServicesH1, ServicesWrapper, ServicesCard, ServicesIcon, ServicesH2, ServicesP} from './ServiceElements'

const Services = () => {
  return (
    <ServicesContainer id='services'>
      <ServicesH1>Our services</ServicesH1>
      <ServicesWrapper>
      <ServicesCard>
  <ServicesIcon src={Icon1}/>
  <ServicesH2>Flexible Learning</ServicesH2>
  <ServicesP>Access our online platform anytime, anywhere and learn at your own pace.</ServicesP>
</ServicesCard>
<ServicesCard>
  <ServicesIcon src={Icon2}/>
  <ServicesH2>Expert Instructors</ServicesH2>
  <ServicesP>Learn from experienced instructors who are passionate about education and dedicated to your success.</ServicesP>
</ServicesCard>
<ServicesCard>
  <ServicesIcon src={Icon3}/>
  <ServicesH2>Engaging Content</ServicesH2>
  <ServicesP>Unlock our vast library of high-quality educational content designed to enhance your learning experience.</ServicesP>
</ServicesCard>
      </ServicesWrapper>
    </ServicesContainer>
  )
}

export default Services
