import styled from 'styled-components';
import { Colors } from '../lib/theme';
import { ImageSolarPlant, logoPartner } from '../assets/images';

export const Wrapper = styled.div`
  display: inline-block;
  width: 100%;
`
export const MainWrapper = styled.div`
  display: inline-block;
  width: 100%;
  border: 2px solid ${Colors.lightgray};
  border-radius: 4px 4px 0 0;
`
export const SideImage = styled.div`
  height: 100vh;
  position: fixed;
  right: 0px;
  top: 0px;
  bottom: 0px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  alignItems: center;
  background-image: url(${ImageSolarPlant});
  background-size: cover;
  width: ${props => props.width + 'px'}
`
export const SideOverLap = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: ${Colors.blue};
  opacity: 0.5;
`
export const SidInfoView = styled.div`
  padding: 30px;
`
export const LeftSideWrapper = styled.div`
  width: 240px;
  padding: 15px 30px;
  background-color: ${Colors.lightgray};
  z-index: 10;
  transition-duration: .3s;
  height: 100vh;
  position: fixed;
`
export const CurrencyOptionView = styled.div`
  bottom: 20px;
  left: 0;
  width: 300px;
  position: absolute;
`
export const CurrencyOptionInnerView = styled.div`
  margin: 0 30px 30px 30px
`
export const MainContainer = styled.div`
  width: 100%;
  height: 100vh;
  min-height: 500px;
  display: flex;
`
export const LogoView = styled.div`
  width: 100%;
  height: 70px;
  background-image: url(${logoPartner});
  background-size: contain;
  background-repeat: no-repeat;
`
export const MainLogoView = styled.div`
  width: 240px;
  height: 60px;
  background-image: url(${logoPartner});
  background-size: contain;
  background-repeat: no-repeat;
`
export const MainQuestionInputContainer = styled.div`
  flex: 1;
  position: relative;
  margin-left: ${props => props.screenWidth > 640 ? '300px' : '0'}
`

export const MainQuestionTotalProgressView = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  border-bottom: 1px solid ${Colors.lightgray};
  background-color: white;
  z-index: 9
`
export const MainQuestionFooter = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${Colors.blue};
  z-index: 9
`
export const MainQuestionContent = styled.div`
  padding-top: 60px;
  padding-bottom: 60px;
`
export const QuestionInputWrapper = styled.div`
  border: 1px solid ${Colors.lightgray};
  padding: 20px;
  margin: 10px;
  border-color: ${props => (props.validation) ? null : Colors.error}
`
export const SignUpContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: rgba(20, 50, 120, 0.9);
  z-index: 20;
  display: flex;
  justify-content: center;
  align-items: center
`
export const SignUpImage = styled.div`
  background-image: url(${ImageSolarPlant});
  width: ${props => props.width + 'px'};
  height: ${props => props.width + 'px'};
  background-size: contain;
`
export const SignUpCloseButtonView = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
  display: flex;
`
