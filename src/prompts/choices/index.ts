interface Choices {
  message: string;
  items: ChoiceOption[];
}

interface ChoiceOption {
  label: string;
  value: any;
}

export function choices({ message, items }: Choices) {
  console.log('choices', message);
}
