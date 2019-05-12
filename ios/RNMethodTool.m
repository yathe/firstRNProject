//
//  RNMethodTool.m
//  myFirstRNProject
//
//  Created by csdc-iMac on 2019/5/9.
//  Copyright © 2019年 Facebook. All rights reserved.
//

#import "RNMethodTool.h"
#import "AppDelegate.h"
#import "NativeViewController.h"

@implementation RNMethodTool

RCT_EXPORT_MODULE()
- (NSArray<NSString *>*)supportedEvents {
  return @[@"EventReminder"];
}

RCT_EXPORT_METHOD(doSomething) {
  dispatch_async(dispatch_get_main_queue(), ^{
    UIAlertController *alertController = [UIAlertController alertControllerWithTitle:@"是否跳转" message:nil preferredStyle:UIAlertControllerStyleAlert];
    UIAlertAction *cancelAction = [UIAlertAction actionWithTitle:@"取消" style:UIAlertActionStyleCancel handler:^(UIAlertAction * _Nonnull action) {
    }];

    UIAlertAction *confirmAction = [UIAlertAction actionWithTitle:@"确认" style:UIAlertActionStyleDefault handler:^(UIAlertAction * _Nonnull action) {
      
      NativeViewController *vc = [[NativeViewController alloc] init];
      AppDelegate *delegate = (AppDelegate *)[[UIApplication sharedApplication] delegate];
      [delegate.window.rootViewController presentViewController:vc animated:YES completion:nil];
    }];
    [alertController addAction:confirmAction];
    [alertController addAction:cancelAction];
    AppDelegate *delegate = (AppDelegate *)[[UIApplication sharedApplication] delegate];
    [delegate.window.rootViewController presentViewController:alertController animated:YES completion:nil];
  });
}

@end
