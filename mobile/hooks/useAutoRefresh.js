import { useState, useEffect, useCallback, useRef } from 'react';

export function useAutoRefresh(fetchFunction, intervalMs) {
  var stateData = useState(null);
  var data = stateData[0]; var setData = stateData[1];
  var stateLoading = useState(true);
  var loading = stateLoading[0]; var setLoading = stateLoading[1];
  var stateError = useState(null);
  var error = stateError[0]; var setError = stateError[1];
  var stateRefresh = useState(null);
  var lastRefresh = stateRefresh[0]; var setLastRefresh = stateRefresh[1];
  var stateCountdown = useState(intervalMs / 1000);
  var countdown = stateCountdown[0]; var setCountdown = stateCountdown[1];

  var intervalRef = useRef(null);
  var countdownRef = useRef(null);
  var fetchRef = useRef(fetchFunction);
  var dataRef = useRef(null);

  useEffect(function() { fetchRef.current = fetchFunction; }, [fetchFunction]);
  useEffect(function() { dataRef.current = data; }, [data]);

  var fetchData = useCallback(function() {
    if (!dataRef.current) setLoading(true);
    fetchRef.current()
      .then(function(result) {
        setData(result); setError(null);
        setLastRefresh(new Date());
        setCountdown(intervalMs / 1000);
        setLoading(false);
      })
      .catch(function(err) { setError(err.message); setLoading(false); });
  }, [intervalMs]);

  var refresh = useCallback(function() { setLoading(true); fetchData(); }, [fetchData]);

  useEffect(function() {
    fetchData();
    intervalRef.current = setInterval(fetchData, intervalMs);
    countdownRef.current = setInterval(function() {
      setCountdown(function(prev) { return prev <= 1 ? intervalMs / 1000 : prev - 1; });
    }, 1000);
    return function() { clearInterval(intervalRef.current); clearInterval(countdownRef.current); };
  }, [fetchData, intervalMs]);

  return { data, loading, error, lastRefresh, countdown, refresh };
}
