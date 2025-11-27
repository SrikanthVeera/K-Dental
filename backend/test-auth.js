// Simple test script for auth endpoints
const testAuth = async () => {
  try {
    // Test registration
    console.log('🔄 Testing registration...');
    
    const registerResponse = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Test User',
        email: `test${Date.now()}@example.com`,
        phone: `98765${Math.floor(Math.random() * 10000).toString().padStart(5, '0')}`,
        password: 'password123',
        role: 'customer'
      }),
    });

    const registerData = await registerResponse.json();
    console.log('Registration Response:', registerData);

    if (registerData.success) {
      console.log('✅ Registration successful');
      
      // Test login
      console.log('🔄 Testing login...');
      
      const loginResponse = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: registerData.data?.email || 'test@example.com',
          password: 'password123'
        }),
      });

      const loginData = await loginResponse.json();
      console.log('Login Response:', loginData);
      
      if (loginData.success) {
        console.log('✅ Login successful');
        console.log('User data:', loginData.data);
      } else {
        console.log('❌ Login failed:', loginData.message);
      }
    } else {
      console.log('❌ Registration failed:', registerData.message);
    }

  } catch (error) {
    console.error('❌ Test error:', error.message);
  }
};

testAuth();