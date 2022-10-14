import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Admin() {
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate('/')}>Admin</button>
    </div>
  );
}
