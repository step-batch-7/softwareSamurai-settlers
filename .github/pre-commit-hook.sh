echo "running tests...";
nyc mocha --recursive; 
testStatus=$?;
if [ $testStatus == 0 ]; then
  echo "\n commiting your code"
  exit 0;
else 
echo "\n tests are failing..."
  exit 1;
fi