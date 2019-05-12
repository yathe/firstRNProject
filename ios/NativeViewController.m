//
//  NativeViewController.m
//  myFirstRNProject
//
//  Created by csdc-iMac on 2019/5/9.
//  Copyright © 2019年 Facebook. All rights reserved.
//

#import "NativeViewController.h"
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>

@interface NativeViewController ()

@end

@implementation NativeViewController

- (void)viewDidLoad {
  [super viewDidLoad];
  self.view.backgroundColor = [UIColor whiteColor];
  self.title = @"原生界面";
  
  UIButton *btn = [UIButton buttonWithType:UIButtonTypeRoundedRect];
  [btn setBackgroundColor:[UIColor grayColor]];
  btn.frame = CGRectMake(70, 160, self.view.frame.size.width - 140, 40);
  [btn addTarget:self action:@selector(jump) forControlEvents:UIControlEventTouchUpInside];
  [self.view addSubview:btn];
    // Do any additional setup after loading the view.
}

- (void)jump {// 跳转回RN界面
  NSURL *jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation moduleName:@"LoginPage" initialProperties:nil launchOptions:nil];
  UIViewController *vc = [[UIViewController alloc] init];
  vc.view = rootView;
  [self presentViewController:vc animated:YES completion:nil];
}

- (void)viewWillAppear:(BOOL)animated {
  [super viewWillAppear:animated];
  [self.navigationController setNavigationBarHidden:NO animated:YES];
}

- (void)viewWillDisappear:(BOOL)animated {// 跳转回RN界面时隐藏导航栏
  [super viewWillDisappear:animated];
  [self.navigationController setNavigationBarHidden:YES animated:YES];
}

/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/

@end
