import React, { useState, useEffect } from "react";
import { Box, Heading, Text, Image, Button, Flex, Grid, Input, useToast } from "@chakra-ui/react";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";

const API_URL = "https://backengine-jcy2.fly.dev";

const Index = () => {
  const [posts, setPosts] = useState([]);
  const [recommendedTopics, setRecommendedTopics] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const toast = useToast();

  useEffect(() => {
    // Fetch posts and recommended topics from API
    // For simplicity, using dummy data here
    setPosts([
      {
        id: 1,
        title: "First Blog Post",
        image: "https://images.unsplash.com/photo-1528716321680-815a8cdb8cbe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxibG9nJTIwcG9zdCUyMGltYWdlfGVufDB8fHx8MTcxMjY4Njk0OHww&ixlib=rb-4.0.3&q=80&w=1080",
        content: "This is the first blog post...",
        tags: ["react", "webdev"],
      },
      {
        id: 2,
        title: "Second Blog Post",
        image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwyfHxibG9nJTIwcG9zdCUyMGltYWdlfGVufDB8fHx8MTcxMjY4Njk0OHww&ixlib=rb-4.0.3&q=80&w=1080",
        content: "This is the second blog post...",
        tags: ["javascript", "tutorial"],
      },
    ]);

    setRecommendedTopics(["React", "Web Development", "JavaScript", "Tutorials"]);
  }, []);

  const handleLogin = async () => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("accessToken", data.accessToken);
        setIsLoggedIn(true);
        toast({
          title: "Login Successful",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        const errorData = await response.json();
        toast({
          title: "Login Failed",
          description: errorData.error,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleSignup = async () => {
    try {
      const response = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.status === 204) {
        toast({
          title: "Signup Successful",
          description: "You can now login with your credentials",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        const errorData = await response.json();
        toast({
          title: "Signup Failed",
          description: errorData.error,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  return (
    <Box>
      <Flex justify="space-between" align="center" p={4} bg="gray.100">
        <Heading size="lg">My Blog</Heading>
        {isLoggedIn ? (
          <Text>Welcome!</Text>
        ) : (
          <Flex align="center">
            <Input placeholder="Email" mr={4} value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input placeholder="Password" type="password" mr={4} value={password} onChange={(e) => setPassword(e.target.value)} />
            <Button onClick={handleLogin} mr={2} colorScheme="blue" size="lg" fontWeight="bold" borderRadius="full" px={8} py={6}>
              Login
            </Button>
            <Button ml={4} colorScheme="green" size="lg" fontWeight="bold" borderRadius="full" px={8} py={6} onClick={handleSignup}>
              Signup
            </Button>
          </Flex>
        )}
      </Flex>

      <Grid templateColumns="2fr 1fr" gap={12} p={12} bg="gray.50">
        <Box>
          <Heading size="2xl" mb={8} color="blue.600">
            Latest Posts
          </Heading>
          {posts.map((post) => (
            <Box key={post.id} mb={8}>
              <Heading size="xl" mb={4}>
                {post.title}
              </Heading>
              <Image src={post.image} alt={post.title} mb={6} borderRadius="lg" />
              <Text fontSize="lg" lineHeight="tall" mb={4}>
                {post.content}
              </Text>
              <Flex mt={2}>
                {post.tags.map((tag) => (
                  <Box key={tag} bg="blue.100" color="blue.800" px={3} py={1} mr={2} borderRadius="full" fontSize="sm" fontWeight="medium">
                    {tag}
                  </Box>
                ))}
              </Flex>
            </Box>
          ))}
        </Box>

        <Box>
          <Heading size="2xl" mb={8} color="blue.600">
            Recommended Topics
          </Heading>
          {recommendedTopics.map((topic) => (
            <Box key={topic} mb={2}>
              <Text fontSize="lg" mb={2} _hover={{ color: "blue.500", cursor: "pointer" }}>
                {topic}
              </Text>
            </Box>
          ))}
        </Box>
      </Grid>
    </Box>
  );
};

export default Index;
