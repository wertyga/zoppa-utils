import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDevice } from 'hooks/useDevice';
import useOnClickOutside from 'hooks/useOnClickOutside';
import classnames from 'classnames';

import s from './styles.module.scss';

type Props = {
  Trigger: React.ReactElement;
  className?: string;
  type?: 'hover' | 'click';
  leftOffset?: number;
};

export const UITooltipPopup: React.FC<Props> = React.memo(
  ({ Trigger, children, className, type = 'hover', leftOffset = 0 as any }) => {
    const { isMobile } = useDevice();
    const container = useRef(null);
    const tooltipComponent = useRef<HTMLDivElement>(null);
    const timer = useRef(null);
    const [state, setState] = useState({
      tooltipOpened: false,
      tooltipShow: false,
      top: 0,
      left: 0,
    });

    const dropState = () => {
      clearTimeout(timer.current);
      timer.current = null;
      setState(prev => ({ ...prev, tooltipOpened: false }));
    };

    const onMouseEnter = e => {
      e.stopPropagation();
      e.preventDefault();
      let timeout = isMobile ? 0 : 700;
      if (type !== 'hover') {
        timeout = 0;
      }
      timer.current = setTimeout(() => {
        const { top, left } = container.current.getBoundingClientRect();
        window.addEventListener('scroll', dropState);
        setState(prev => ({ ...prev, tooltipOpened: true, top: top + 10, left: left + leftOffset }));
      }, timeout);
    };

    const onMouseLeave = () => {
      dropState();
      window.removeEventListener('scroll', dropState);
    };

    useOnClickOutside(container, state.tooltipOpened, dropState);

    useEffect(() => {
      if (!state.tooltipOpened) return;
      const { right, left } = tooltipComponent.current.getBoundingClientRect();
      const isRightSliced = right > window.innerWidth;
      if (isRightSliced) {
        const leftSlice = right - window.innerWidth;
        setState(prev => ({ ...prev, left: prev.left - leftSlice, tooltipShow: true }));
      } else {
        setState(prev => ({ ...prev, tooltipShow: true }));
      }
    }, [state.tooltipOpened]);

    const eventHandlers = useMemo(() => {
      if (type === 'hover' && !isMobile) {
        return {
          onMouseLeave,
          onMouseEnter,
        };
      }

      return {
        onClick: onMouseEnter,
      };
    }, [state.tooltipOpened, isMobile, leftOffset]);

    return (
      <div className={classnames(className, s.UITooltip)} ref={container} {...eventHandlers}>
        {state.tooltipOpened && (
          <div
            className={s.tooltipWrapper}
            style={{
              top: state.top,
              left: state.left,
            }}
            ref={tooltipComponent}
          >
            <div className={s.tooltip} style={{ opacity: state.tooltipShow ? 1 : 0 }}>
              {children}
            </div>
          </div>
        )}
        <span role="presentation">{Trigger}</span>
      </div>
    );
  },
);
