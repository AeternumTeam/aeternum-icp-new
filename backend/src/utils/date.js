export const getUserLocaleDate = () => {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    
    const date = new Date();
  
    const formattedDate = new Intl.DateTimeFormat('en-US', {
      timeZone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }).format(date);
  
    return formattedDate;
};  