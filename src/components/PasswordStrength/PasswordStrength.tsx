import { getStrengthColor } from '../../utils/getStrengthColor';

interface IPasswordStrength {
  strength: number;
}

export function PasswordStrength({ strength }: IPasswordStrength) {
  return (
    <div>
      <div>Password Strength: {strength.toFixed(2)}%</div>
      <div
        style={{
          width: '100%',
          height: '10px',
          backgroundColor: 'lightgray',
          marginTop: '5px',
        }}
      >
        <div
          style={{
            width: `${strength}%`,
            height: '100%',
            backgroundColor: getStrengthColor(strength),
          }}
        />
      </div>
    </div>
  );
}
