import React, { useEffect } from 'react';
import styles from './main.module.scss';
import Input from 'components/common/Input';
import { utils } from 'utils/utils';
import ConfirmModal from 'components/common/ConfirmModal';
import { useAppDispatch, useAppSelector } from 'hooks/useRedux';
import { openConfirmModal } from 'reducers/modal';

export default function Main() {
  const { isConfirmModalOpen } = useAppSelector(state => state.modal);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(openConfirmModal());
  }, []);
  return (
    <>
      <div>
        {isConfirmModalOpen && (
          <ConfirmModal modalMessage='게시물을 삭제하시겠습니까?' />
        )}
      </div>
    </>
  );
}
