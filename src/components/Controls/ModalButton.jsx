import ControlButton from './ControlButton';
import { ModalContainer } from '../Container';

const ModalButton = ({
  buttonName,
  variant,
  startIcon,
  endIcon,
  color,
  open,
  onClick,
  onClose,
  title,
  width,
  height,
  mWidth,
  children,
}) => {
  return (
    <>
      <ControlButton
        onClick={onClick}
        variant={variant || 'outlined'}
        color={color || 'primary'}
        width={width}
        height={height}
        startIcon={startIcon}
        endIcon={endIcon}
        fontSize="1.1rem"
      >
        {buttonName}
      </ControlButton>
      <ModalContainer title={title} open={open} onClose={onClose} mWidth={mWidth}>
        {children}
      </ModalContainer>
    </>
  );
};

export default ModalButton;
