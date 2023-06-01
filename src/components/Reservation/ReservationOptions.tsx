import React, { useContext, useEffect, useState } from 'react';
import { ReservationContext, ReservationInfo } from './ReservationProvider';
import styles from './ReservationOptions.module.scss';
import {
  PersonalSeatLayout,
  FirstGroupSeatLayout,
  GraduateSeatLayout,
  SecondGroupSeatLayout,
} from 'components/Reservation/SeatLayout';

interface CreateTypeSelectorProps {
  typeList: string[];
  onSelect: (value: string) => void;
}

interface CreateTimeSelectorProps {
  typeList: string[];
}

const CreateTypeSelector: React.FC<CreateTypeSelectorProps> = ({
  typeList,
  onSelect,
}) => {
  const [selectedSeatTypeIndex, setSelectedSeatTypeIndex] = useState<number>(0);

  return (
    <div className={styles.typeContainer}>
      {typeList.map((type, index) => (
        <button
          key={type}
          className={
            selectedSeatTypeIndex === index
              ? styles.checkedType
              : styles.unCheckedType
          }
          onClick={() => {
            onSelect(type);
            setSelectedSeatTypeIndex(index);
          }}
        >
          {type}
        </button>
      ))}
    </div>
  );
};

const CreateTimeSelector: React.FC<CreateTimeSelectorProps> = ({
  typeList,
}) => {
  const [isClicked, setIsClicked] = useState<boolean[]>(
    typeList.map((_, index) => index === 0),
  );

  const { reservationInfo, updateReservationInfo } =
    useContext(ReservationContext);
  const updateReservation = (updatedInfo: Partial<ReservationInfo>) => {
    const updatedReservationInfo = {
      ...reservationInfo,
      ...updatedInfo,
    };
    updateReservationInfo(updatedReservationInfo);
  };
  useEffect(() => {
    const selectedTimes = typeList.filter((_, index) => isClicked[index]);
    const startTime = selectedTimes
      .map(time => time.substring(0, 2))
      .join(', ');

    updateReservation({ startTime: startTime });

    // const updatedReservationInfo = {
    //   ...reservationInfo,
    //   startTime: startTime,
    // };
    // updateReservationInfo(updatedReservationInfo);
  }, [isClicked]);

  const handleClick = (index: number) => {
    const updatedClickedState = [...isClicked];
    updatedClickedState[index] = !updatedClickedState[index];
    setIsClicked(updatedClickedState);
  };

  return (
    <div className={styles.typeContainer}>
      {typeList.map((type, index) => (
        <button
          key={type}
          className={
            isClicked[index] ? styles.checkedType : styles.unCheckedType
          }
          onClick={() => handleClick(index)}
        >
          {type}
        </button>
      ))}
    </div>
  );
};

const ReservationOptions: React.FC = () => {
  const seatTypeList: string[] = ['개인석', '팀플석', '수료기수석', '미팅룸'];
  const TimeList = ['10:00~14:00', '14:00~18:00', '18:00~22:00'];
  const [visitors, setVisitors] = useState('');

  const { reservationInfo, updateReservationInfo } =
    useContext(ReservationContext);
  const updateReservation = (updatedInfo: Partial<ReservationInfo>) => {
    const updatedReservationInfo = {
      ...reservationInfo,
      ...updatedInfo,
    };
    updateReservationInfo(updatedReservationInfo);
  };

  // axios.get('api', {
  //   headers: {
  //     date: reservationInfo.date,
  //     startTime: reservationInfo.startTime,
  //   },
  // })
  //   .then(response => {
  //
  //   })
  //   .catch(error => {
  //     // 에러 처리
  //   });
  // 날짜, 시간 서버에 보내서 예약된 좌석 받아오기
  // const { reserved, updateReserved } = useContext(ReservationContext);
  // updateReserved(예약된 좌석 정보);

  useEffect(() => {
    if (!reservationInfo.seatType) {
      updateReservation({ seatType: '개인석', startTime: '10', seat: 'A' });
      // const updatedReservationInfo = {
      //   ...reservationInfo,
      //   seatType: '개인석',
      //   startTime: '10',
      //   seat: 'A',
      // };
      // updateReservationInfo(updatedReservationInfo);
    }
    console.log('다른 파일 좌석 컴포넌트 렌더링');
    console.log(reservationInfo);
  }, [
    reservationInfo.seatType,
    reservationInfo.startTime,
    reservationInfo.seat,
    updateReservationInfo,
  ]);

  const handleSeatTypeSelect = (value: string) => {
    updateReservation({ seatType: value });
    // const updatedReservationInfo = {
    //   ...reservationInfo,
    //   seatType: value,
    // };
    // updateReservationInfo(updatedReservationInfo);
  };

  const handleEventClick = (value: string) => {
    updateReservation({ seat: value });
    // const updatedReservationInfo = {
    //   ...reservationInfo,
    //   seat: value,
    // };
    // updateReservationInfo(updatedReservationInfo);
  };

  const showSeatKind = () => {
    if (reservationInfo.seatType === '개인석') {
      return (
        <>
          <div className={styles.seatKindContainer}>
            <div>
              <div className={styles.box}></div>
              <div className={styles.kindText}>다른좌석유형/이용불가</div>
            </div>
            <div>
              <div className={styles.box}></div>
              <div className={styles.kindText}>내예약</div>
            </div>
            <div>
              <div className={styles.box}></div>
              <div className={styles.kindText}>이용가능</div>
            </div>
          </div>
          <div className={styles.seatContainer}>
            <PersonalSeatLayout
              className={styles.possible}
              clickEvent={handleEventClick}
            />
            <FirstGroupSeatLayout className={styles.impossible} />
            <GraduateSeatLayout className={styles.impossible} />
            <SecondGroupSeatLayout className={styles.impossible} />
          </div>
        </>
      );
    } else if (reservationInfo.seatType === '팀플석') {
      return (
        <>
          <div className={styles.seatKindContainer}>
            <div>
              <div className={styles.box}></div>
              <div className={styles.kindText}>다른좌석유형/이용불가</div>
            </div>
            <div>
              <div className={styles.box}></div>
              <div className={styles.kindText}>내예약</div>
            </div>
            <div>
              <div className={styles.box}></div>
              <div className={styles.kindText}>이용가능 (4인석)</div>
            </div>
            <div>
              <div className={styles.box}></div>
              <div className={styles.kindText}>이용가능 (2인석)</div>
            </div>
          </div>
          <div className={styles.seatContainer}>
            <PersonalSeatLayout className={styles.impossible} />
            <FirstGroupSeatLayout
              className={styles.possible}
              clickEvent={handleEventClick}
            />
            <GraduateSeatLayout className={styles.impossible} />
            <SecondGroupSeatLayout
              className={styles.possible}
              clickEvent={handleEventClick}
            />
          </div>
        </>
      );
    } else if (reservationInfo.seatType === '수료기수석') {
      return (
        <>
          <div className={styles.seatKindContainer}>
            <div>
              <div className={styles.box}></div>
              <div className={styles.kindText}>다른좌석유형/이용불가</div>
            </div>
            <div>
              <div className={styles.box}></div>
              <div className={styles.kindText}>내예약</div>
            </div>
            <div>
              <div className={styles.box}></div>
              <div className={styles.kindText}>이용가능 (개인석)</div>
            </div>
            <div>
              <div className={styles.box}></div>
              <div className={styles.kindText}>이용가능 (2인석)</div>
            </div>
          </div>
          <div className={styles.seatContainer}>
            <PersonalSeatLayout className={styles.impossible} />
            <FirstGroupSeatLayout className={styles.impossible} />
            <GraduateSeatLayout
              className={styles.possible}
              clickEvent={handleEventClick}
            />
            <SecondGroupSeatLayout className={styles.impossible} />
          </div>
        </>
      );
    } else if (reservationInfo.seatType === '미팅룸') {
      return (
        <div>
          <CreateTypeSelector
            typeList={['미팅룸A (최대 6인)', '미팅룸B (최대 10인)']}
            onSelect={(value: string) => {
              updateReservation({ seat: value.charAt(3) });
              // const updatedReservationInfo = {
              //   ...reservationInfo,
              //   seat: value.charAt(3),
              // };
              // updateReservationInfo(updatedReservationInfo);
            }}
          />
          <div className={styles.visitor}>모든 방문자 성함을 작성해주세요.</div>
          <input
            className={styles.visitorInput}
            onChange={e => {
              updateReservation({ visitors: e.target.value });
              // const updatedReservationInfo = {
              //   ...reservationInfo,
              //   visitors: e.target.value,
              // };
              // updateReservationInfo(updatedReservationInfo);
            }}
            type='text'
            placeholder='필수입력*'
          />
          <div className={styles.submitButton}>예약하기</div>
        </div>
      );
    } else {
      return null;
    }
  };

  return (
    <div>
      <CreateTypeSelector
        typeList={seatTypeList}
        onSelect={handleSeatTypeSelect}
      />
      <CreateTimeSelector typeList={TimeList} />
      {showSeatKind()}
    </div>
  );
};

export default ReservationOptions;
