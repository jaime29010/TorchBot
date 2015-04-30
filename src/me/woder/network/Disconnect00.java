package me.woder.network;

import java.io.IOException;

import me.woder.bot.ChatColor;
import me.woder.bot.Client;

public class Disconnect00 extends Packet{
    public Disconnect00(Client c) {
        super(c);
    }
    
    @Override
    public void read(Client c, int len, ByteArrayDataInputWrapper buf) throws IOException{
        String reason = getString(buf);
        c.gui.addText(ChatColor.DARK_RED + "Kicked: " + reason);
        c.stopBot();
    }

}
