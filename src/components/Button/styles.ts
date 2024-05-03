import styled from 'styled-components'
import { theme } from '../../styles/Theme'

type ButtonsProps = {
  color: string
  width?: string
  height?: string
  isActive?: boolean
  disabled?: boolean
}

const getColor = (colorType: string) => {
  const objColors = {
    red: {
      color: theme.colors.white,
      backgroundColor: theme.colors.red,
      border: `2px solid ${theme.colors.red}`,
      hoverColor: theme.colors.redLight,
      hoverBorder: `2px solid ${theme.colors.red}`,
      shadow: '0px 0px 0px 4px #e31e2442'
    },
    yellow: {
      color: theme.colors.black50,
      backgroundColor: theme.colors.yellow,
      border: `2px solid ${theme.colors.yellow}`,
      hoverColor: theme.colors.yellowLight,
      hoverBorder: `2px solid ${theme.colors.yellow}`,
      shadow: '0px 0px 0px 4px #fecc0042'
    },
    black: {
      color: theme.colors.white,
      backgroundColor: theme.colors.black50,
      hoverColor: theme.colors.black50Light,
      hoverBorder: `2px solid ${theme.colors.black50}`,
      shadow: '0px 0px 0px 4px #4d4d4d42'
    }
  }

  return objColors[colorType as keyof typeof objColors]
}

export const ButtonContainer = styled.button<ButtonsProps>`
  ${(props) => getColor(props.color)};

  display: flex;
  height: 3.5rem;
  padding: 0.5rem 2rem;
  justify-content: center;
  align-items: center;
  gap: ${theme.spacing.xxl};
  border-radius: 0.75rem;

  font-size: ${theme.fontSize.md};
  white-space: nowrap;
  font-weight: ${theme.fontWeight.semiBold};
  line-height: 150%;

  font-family: ${theme.fonts.principal};

  transition: all 0.6s ease;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  &:hover {
    background-color: ${({ color }) => getColor(color).hoverColor};

    border: ${({ color }) => getColor(color).hoverBorder};
    box-shadow: ${({ color }) => getColor(color).shadow};

    transition: all 0.5s ease;
  }
`

