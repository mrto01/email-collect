import BlockContainer from './BlockContainer.jsx';

const BlockProcessBar = ({id, options = {}, wrapper_options = {}}) => {
  let {} = options;
  let processBar;
  let color = 'red';

  if (typeof window === 'undefined') {
    processBar = `{{process_bar_${id}}}`;
  } else {
    processBar = <svg width="21" height="16" viewBox="0 0 21 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.7966 1.36914V6.9619" stroke={color} strokeWidth="1.06" strokeLinecap="round"/>
      <path d="M9 4.16528H14.5928" stroke={color} strokeWidth="1.06" strokeLinecap="round"/>
      <path d="M1 1H4.37432C4.41308 1 4.4473 1.0253 4.45865 1.06236L7.50721 11.0137C7.51856 11.0508 7.55278 11.0761 7.59154 11.0761H16.6395C16.6752 11.0761 16.7073 11.0546 16.721 11.0217L19.5362 4.23079C19.5603 4.17271 19.5176 4.10882 19.4547 4.10882H17.8969"
            stroke={color} strokeWidth="1.05832" strokeLinecap="round"/>
      <circle cx="8.45671" cy="14.582" r="1.25676" fill={color}/>
      <circle cx="15.4567" cy="14.582" r="1.25676" fill={color}/>
    </svg>;
  }

  return (
    <BlockContainer options={wrapper_options}>
      {processBar}
    </BlockContainer>
  );
};

export default BlockProcessBar;

