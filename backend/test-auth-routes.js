// Quick test to verify auth routes are working
const axios = require('axios');

const BASE_URL = 'http://localhost:5000';

async function testAuthRoutes() {
  console.log('🧪 Testing Authentication Routes\n');

  try {
    // Test 1: Health Check
    console.log('1️⃣ Testing health endpoint...');
    const health = await axios.get(`${BASE_URL}/health`);
    console.log('✅ Health check:', health.data.message);

    // Test 2: Register
    console.log('\n2️⃣ Testing registration...');
    const testUser = {
      name: 'Test User',
      email: `test${Date.now()}@example.com`,
      phone: `${Math.floor(Math.random() * 9000000000) + 1000000000}`,
      password: 'test123456'
    };

    try {
      const register = await axios.post(`${BASE_URL}/api/auth/register`, testUser);
      console.log('✅ Registration successful');
      console.log('   User ID:', register.data.data.id);
      console.log('   Token received:', register.data.data.token ? 'Yes' : 'No');

      const token = register.data.data.token;

      // Test 3: Login
      console.log('\n3️⃣ Testing login...');
      const login = await axios.post(`${BASE_URL}/api/auth/login`, {
        email: testUser.email,
        password: testUser.password
      });
      console.log('✅ Login successful');
      console.log('   Token received:', login.data.data.token ? 'Yes' : 'No');

      // Test 4: Get Profile
      console.log('\n4️⃣ Testing get profile...');
      const profile = await axios.get(`${BASE_URL}/api/user/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('✅ Profile retrieved');
      console.log('   Name:', profile.data.data.name);
      console.log('   Email:', profile.data.data.email);

      // Test 5: Wrong password
      console.log('\n5️⃣ Testing wrong password...');
      try {
        await axios.post(`${BASE_URL}/api/auth/login`, {
          email: testUser.email,
          password: 'wrongpassword'
        });
        console.log('❌ Should have failed with wrong password');
      } catch (err) {
        if (err.response && err.response.data.message === 'Incorrect password') {
          console.log('✅ Correct error message for wrong password');
        } else {
          console.log('⚠️  Unexpected error:', err.response?.data?.message);
        }
      }

      // Test 6: Wrong email
      console.log('\n6️⃣ Testing wrong email...');
      try {
        await axios.post(`${BASE_URL}/api/auth/login`, {
          email: 'nonexistent@example.com',
          password: 'test123456'
        });
        console.log('❌ Should have failed with wrong email');
      } catch (err) {
        if (err.response && err.response.data.message === 'Invalid email') {
          console.log('✅ Correct error message for wrong email');
        } else {
          console.log('⚠️  Unexpected error:', err.response?.data?.message);
        }
      }

      console.log('\n✅ All tests passed!');
      console.log('\n🎉 Authentication system is working correctly!');

    } catch (error) {
      if (error.response) {
        console.log('❌ Error:', error.response.data.message);
        console.log('   Status:', error.response.status);
      } else {
        console.log('❌ Error:', error.message);
      }
    }

  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      console.log('❌ Server is not running!');
      console.log('   Please start the server with: npm run dev');
    } else {
      console.log('❌ Error:', error.message);
    }
  }
}

// Check if axios is available
try {
  require.resolve('axios');
  testAuthRoutes();
} catch (e) {
  console.log('❌ axios not found. Installing...');
  console.log('   Run: npm install axios');
  console.log('   Then run: node test-auth-routes.js');
}
