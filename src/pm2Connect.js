const pm2 = require('pm2')
//const numCPUs = require('os').cpus().length;

pm2.connect(function(err) {
  if (err) {
    console.error(err)
    process.exit(2)
  }

  pm2.start({
    script    : './src/app.js',         // Script to be run
    exec_mode : 'cluster',        // Allows your app to be clustered
    instances : 4,                // Optional: Scales your app by 4
    max_memory_restart : '100M',   // Optional: Restarts your app if it reaches 100Mo
    autorestart: false,
    args: '2',
    watch: true,
  }, function(err, apps) {
    pm2.disconnect();   // Disconnects from PM2
    if (err) throw err
});

  pm2.sendDataToProcessId({
    type : 'process:msg',
    data : {
      some : 'data',
      hello : true
    },
    id   : 0, // id of procces from "pm2 list" command or from pm2.list(errback) method
    topic: 'some topic'
  }, function(err, res) {
  });

  pm2.launchBus(function(err, bus) {
    bus.on('process:msg', function(packet) {
      packet.data.success.should.eql(true);
      packet.process.pm_id.should.eql(proc1.pm2_env.pm_id);
      done();
    });
  });
});
