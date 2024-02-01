'use client'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateTimeFrame, fetchDonorAnalytics } from './path-to-your-donorAnalyticsSlice';
import { fetchTotalContributionsChartData } from '../../lib/features/analytics/analyticSlice';

const TimeFrameSelect = () => {
    const dispatch = useDispatch();
    const selectedTimeFrame = useSelector(state => state.analytics.selectedTimeFrame);

    useEffect(() => {
        // Fetch data whenever the selectedTimeFrame changes
        dispatch(fetchDonorAnalytics(selectedTimeFrame))
        dispatch(fetchTotalContributionsChartData(selectedTimeFrame))
    }, [selectedTimeFrame, dispatch]);

    const handleTimeFrameChange = (e) => {
        dispatch(updateTimeFrame(e.target.value));
    };

    return (
        <select value={selectedTimeFrame} onChange={handleTimeFrameChange}>
            <option value="30days">Last 30 Days</option>
            <option value="60days">Last 60 Days</option>
            <option value="90days">Last 90 Days</option>
            <option value="Q1">Q1</option>
            <option value="Q2">Q2</option>
      // ... other options ...
        </select>
    );
};

export default TimeFrameSelect;