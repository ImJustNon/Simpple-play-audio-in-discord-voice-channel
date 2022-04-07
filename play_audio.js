const { Client, MessageEmbed } = require('discord.js'); //ดึง Client , MessageEmbed จาก discordjs
require('@discordjs/voice'); //ดึง @discordjs/voice ทำงาน
const client = new Client(); //สร้าง variable เก็บ new Client() เพื่อสะดวกใช้
const ytdl = require('ytdl-core'); //ดึง ytdl-core เเละเก็บไว้ใน variable ytdl(YouTube DownLoad)
const yts = require( 'yt-search' ); //ดึง yt-search เเละเก็บไว้ใน variable yts(YouTube Search)
//npm i discord.js@~12.5.3 @discordjs/voice ytdl-core yt-search opuscript @discordjs/opus node-opus 
const prefix = ''; //สร้าง prefix
const token = ''; //ใส้ token บอท
client.on('ready',() =>{ //จะทำต่อเมื่อ Login บอทเรียบร้อย
    console.log('Bot is ready'); //เเสดงใน log ว่าพร้อม
});
client.on('message', async() =>{ //จะทำงานต่อเมื่อ มีข้อความปรากดใน guild(เซิฟเวอร์ดิสเเต่ศัพท์เขียนบอทใช้ guild)
    let args = message.content.slice(prefix.length).trim().split(/ +/g); //สิ่งที่ตามหลังคำสั่งโดยจะเก็บในรูปเเบบ Array[] เเละจะเเบ่งตามที่เว้นวรรค (' ') 
    let cmd = args.shift().toLowerCase(); //คำสั่ง
    if(cmd === 'play'){ //เช็คหากคำสั่งครงกันให้ทำ
        const voiceChannel = message.member.voice.channel;
        if(!voiceChannel) return message.reply('Join Voice Chanel First!');
        const text = args.join(' ');
        if(!text) return message.reply('missing args');
        const r = await yts(text);
        const msg = await message.channel.send('Searching...!');
        const getid = ytdl.getURLVideoID(r.all[0].url)
        const info = await ytdl.getInfo(getid);
        const song = ytdl.chooseFormat(info.formats, { quality: 'highestaudio' });
        await voiceChannel.join().then(async(connection) =>{
            msg.edit('Track Found!');
            message.channel.send(`Playing ${r.all[0].title}`);
            const dispather = await connection.play(song.url);
            dispather.on('finish',() =>{
                voiceChannel.leave();
            });
        });
    }
});
client.login(token);
