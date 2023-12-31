import React, { useState, MouseEvent, useRef, useMemo } from 'react';
import styles from './signupSelectBtn.module.scss';
import darkStyles from './signupSelectBtnDark.module.scss';
import svgDown from 'assets/ChevronDown.svg';
import useHideOnClickOutside from 'hooks/useHideOnClickOutside';
import { useSelector } from 'react-redux';
import { RootState } from 'store/configureStore';

// SignUpSelectBtn 컴포넌트
interface SignUpSelectBtnProps {
  buttonName: string;
  buttonList: string[];
  onValueSelected: (value: string) => void; // 콜백 함수 prop 추가
}

const SignUpSelectBtn = (props: SignUpSelectBtnProps): React.ReactElement => {
  const [selectBtn, setSelectBtn] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  // ignoreRef 생성
  const buttonRef = useRef<HTMLButtonElement>(null);

  // useHideOnClickOutside 훅 사용
  const { ref } = useHideOnClickOutside(() => setIsVisible(false), buttonRef);

  const menuBtnHandle = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // 기본 동작 막기
    e.stopPropagation();
    setIsVisible(!isVisible);
  };

  const selectHandle = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // 기본 동작 막기
    const value = e.currentTarget.value;
    setSelectBtn(value);
    setIsVisible(false); // 선택 후 메뉴 숨기기
    props.onValueSelected(value); // 선택한 값을 부모 컴포넌트에 전달
  };

  const isDarkMode = useSelector(
    (state: RootState) => state.checkMode.isDarkMode,
  );

  const selectedStyles = useMemo(() => {
    return isDarkMode ? darkStyles : styles;
  }, [isDarkMode]);

  return (
    <div className={selectedStyles.buttonLayout}>
      <button
        key={props.buttonName}
        ref={buttonRef}
        onClick={menuBtnHandle}
        className={selectedStyles.selectSubject}
      >
        <span>{selectBtn || props.buttonName}</span>
        <img src={svgDown} alt='메뉴' />
      </button>
      <div
        ref={ref}
        className={
          isVisible ? selectedStyles.selectLists : styles.hiddenMenu // isVisible 상태만으로 클래스 결정
        }
      >
        {props.buttonList.map(list => (
          <button
            onClick={selectHandle}
            className={selectedStyles.selectList}
            value={list}
            key={list}
          >
            <span>{list}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SignUpSelectBtn;
