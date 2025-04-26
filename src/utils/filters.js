export const filterByTimeOfDay = (data, period) => {
    return data.filter(entry => {
      const hour = new Date(entry.timestamp).getHours();
      if (period === 'morning') return hour >= 6 && hour < 12;
      if (period === 'afternoon') return hour >= 12 && hour < 18;
      if (period === 'evening') return hour >= 18 && hour < 24;
      return true;
    });
  };
  